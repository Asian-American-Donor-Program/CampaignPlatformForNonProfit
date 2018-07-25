using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RecommendationEngine.Models
{
    public partial class RecommendationResult
    {
        //public int Confidence { get; set; }
        public HashSet<string> SuggestedTags { get; set; }
        public HashSet<Handle> SuggestedHandles{ get; set; }
      
    }

    public partial class HashTag
    {
        public int Confidence { get; set; }
       // public string SocialMediaType { get; set; }
        public string TagName { get; set; }
        public HashTag(int confidence,  string tagName)
        {
            Confidence = confidence;
            //SocialMediaType = socialMediaType;
            TagName = tagName;
        }
    }

    public partial class Handle
    {
        public int Confidence { get; set; }
        public string SocialMediaType { get; set; }
        public string HandleName { get; set; }

        public Handle(int confidence, string socialMediaType, string handleName)
        {
            Confidence = confidence;
            SocialMediaType = socialMediaType;
            HandleName = handleName;
        }
    }

    public partial class EthinicityResults
    {
     
        public string STNAME { get; set; }
        public string CTYNAME { get; set; }
        public int Population { get; set; }

    }

    public partial class HandleResults
    {
        public string TwitterHandle { get; set; }
        public string InstagramHandle { get; set; }

    }
}