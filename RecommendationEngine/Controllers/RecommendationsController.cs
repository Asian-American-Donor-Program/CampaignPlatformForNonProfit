using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Newtonsoft.Json;
using RecommendationEngine;
using RecommendationEngine.Models;

namespace RecommendationEngine.Controllers
{
    public class RecommendationsController : ApiController
    {
        private RecommendationEngineDBContext db = new RecommendationEngineDBContext();

        // GET: api/Recommendations
        public IQueryable<CensusInfo> GetRecommendations()
        {
            return db.CensusInfoes.Take(100);
        }

        // GET: api/Recommendations/5
        [ResponseType(typeof(RecommendationResult))]
        [Route("api/Recommendations/{ethinicity}")]
        public IHttpActionResult GetRecommendations(string ethinicity)
        {
            RecommendationResult result = null;
            try
            {
                //Get the TOP 5 city hashtags based on ethinicity
                // db.Database.CommandTimeout = 900;
                //string cmdText = "Select top 5 GU_name as EthinicCity, Count(*) as EthinicPopulation from [CensusInfo]"
                //                    + " INNER JOIN EthinicityReference on IMPRACE = Ethinicity_Code "
                //                    + " INNER JOIN CountyFIPS  on State_FIPS_Code = STATE WHERE Ethinicity_Value LIKE '%" + ethinicity + "%' "
                //                    + " AND Entity_Description = 'City' Group By GU_name order by Count(*) desc";

                string cmdText = "Select top 5 STNAME, CTYNAME, sum(respop) as [Population] "
                + "from censusinfo where imprace in (Select [Ethinicity_Code] from [EthinicityReference] where [Ethinicity_Value] like '%" + ethinicity + "%') "
                + "group by STNAME, CTYNAME "
                + "order by [Population] Desc";

                var recommendations = db.Database.SqlQuery<EthinicityResults>(cmdText).ToList();

                result = new RecommendationResult();
                result.SuggestedTags = new List<HashTag>();
                foreach (EthinicityResults er in recommendations)
                {
                    result.SuggestedTags.Add(new HashTag(100, "#" + er.STNAME + "_" + er.CTYNAME));
                }

                List<string> ethinicWords = ethinicity.Split(new char[] { ' ' }).ToList();
                List<string> conjunctions = new List<string>() { "alone", "and", "other", "or" };

                string ethinicQuery = "";
                foreach (string word in ethinicWords.Except(conjunctions))
                {

                    ethinicQuery += " Ethnicity like '%" + word + "%' or ";
                }

                ethinicQuery = ethinicQuery.Substring(0, ethinicQuery.LastIndexOf(" or "));

                string cmdHandleText = "SELECT top 5 TwitterHandle,InstagramHandle FROM dbo.SocialMedia WHERE " + ethinicQuery;

                var handles = db.Database.SqlQuery<HandleResults>(cmdHandleText).ToList();

                result.SuggestedHandles = new List<Handle>();
                foreach (HandleResults hr in handles)
                {
                    if (!string.IsNullOrEmpty(hr.TwitterHandle))
                        result.SuggestedHandles.Add(new Handle(100, "Twitter", hr.TwitterHandle));
                    if (!string.IsNullOrEmpty(hr.InstagramHandle))
                        result.SuggestedHandles.Add(new Handle(100, "Instagram", hr.InstagramHandle));
                }

                if (result == null)
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            // CensusInfo result = db.CensusInfoes.FirstOrDefault(c=>c.STNAME== messagetext);


            return Ok(result);
        }


        // GET: api/Recommendations/5
        [ResponseType(typeof(RecommendationResult))]
        //[Route("api/Recommendations/{messagetext}")]
        [HttpPost]
        public async Task<IHttpActionResult> GetCognitiveRecommendations(HttpRequestMessage requestMessage)
        {
            CognitiveRecommendationResult cognitiveResult = new CognitiveRecommendationResult();

            try
            {
                //string bethematch_coginitive_key = Helpers.Uitls.GetTokenFromKeyVault("bethematch-coginitive-key").Result;
                string bethematch_coginitive_key = "8477696f1a16457c994934afde5871e9";
                //string keyPhrases_Url = "https://westus2.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases";
                //string sentiment_Url = "https://westus2.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
                HttpClient httpClient_KeyWords = new HttpClient();
                httpClient_KeyWords.BaseAddress = new Uri("https://westus2.api.cognitive.microsoft.com");

                httpClient_KeyWords.DefaultRequestHeaders.Add("Accept", "application/json");
                httpClient_KeyWords.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", bethematch_coginitive_key);
                var messageText = await requestMessage.Content.ReadAsStringAsync();
                string payLoad = "{\"documents\": [{ \"language\": \"en\",\"id\": \"1\",\"text\":" + messageText + "}]}";

                var stringContent_keyPhrases = new StringContent(payLoad, Encoding.UTF8, "application/json");
                var result_keyPhrases = await httpClient_KeyWords.PostAsync("/text/analytics/v2.0/keyPhrases", stringContent_keyPhrases);

                string result_keyPhrases_content = await result_keyPhrases.Content.ReadAsStringAsync();

                KeyWordResults ctaResults_KeyWords = JsonConvert.DeserializeObject<KeyWordResults>(result_keyPhrases_content);
                cognitiveResult.SuggestedKeywordTags = ctaResults_KeyWords.documents[0].keyPhrases.Take(5).ToList();
                List<string> cleanedKeywordTags = new List<string>();
                foreach (string tag in cognitiveResult.SuggestedKeywordTags)
                {
                    cleanedKeywordTags.Add("#" + tag.Replace(" ", "_"));
                }
                cognitiveResult.SuggestedKeywordTags = cleanedKeywordTags;
                HttpClient httpClient_Sentiment = new HttpClient();
                httpClient_Sentiment.BaseAddress = new Uri("https://westus2.api.cognitive.microsoft.com");

                httpClient_Sentiment.DefaultRequestHeaders.Add("Accept", "application/json");
                httpClient_Sentiment.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", bethematch_coginitive_key);

                var stringContent_Sentiment = new StringContent(payLoad, Encoding.UTF8, "application/json");
                var result_Sentiment = await httpClient_Sentiment.PostAsync("/text/analytics/v2.0/sentiment", stringContent_Sentiment);

                string result_Sentiment_content = await result_Sentiment.Content.ReadAsStringAsync();

                SentimentResults ctaResults_Sentiments = JsonConvert.DeserializeObject<SentimentResults>(result_Sentiment_content);
                cognitiveResult.SentimentScore = ctaResults_Sentiments.documents[0].score;
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(cognitiveResult);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }


    }
}