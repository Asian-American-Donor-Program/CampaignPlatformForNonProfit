namespace RecommendationEngine.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class URL
    {
        [Key]
        public int Url_ID { get; set; }

        [StringLength(50)]
        public string Platform { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? ContentID { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? CampaignID { get; set; }

        [StringLength(500)]
        public string LongURL { get; set; }

        [StringLength(50)]
        public string ShortURL { get; set; }
    }
}
