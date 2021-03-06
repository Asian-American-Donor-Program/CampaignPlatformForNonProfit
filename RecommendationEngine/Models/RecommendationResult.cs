﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RecommendationEngine.Models
{
    public partial class RecommendationResult
    {
        //public int Confidence { get; set; }
        public List<HashTag> SuggestedTags { get; set; }
        public List<Handle> SuggestedHandles{ get; set; }
      
    }
    public partial class CognitiveRecommendationResult
    {
        //public int Confidence { get; set; }
        public List<string> SuggestedKeywordTags{ get; set; }
        public double SentimentScore{ get; set; }

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

    public partial class Document
    {
        public string id { get; set; }
        public List<string> keyPhrases { get; set; }
        public double score { get; set; }
    }

    public partial class KeyWordResults
    {
        public List<Document> documents { get; set; }
        public List<object> errors { get; set; }
    }
    public partial class SentimentResults
    {
        public List<Document> documents { get; set; }
        public List<object> errors { get; set; }
    }
}