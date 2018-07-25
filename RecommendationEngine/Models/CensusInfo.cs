namespace RecommendationEngine.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CensusInfo")]
    public partial class CensusInfo
    {
        public int SUMLEV { get; set; }

        public int STATE { get; set; }

        public int COUNTY { get; set; }

        [Required]
        [StringLength(50)]
        public string STNAME { get; set; }

        [Required]
        [StringLength(50)]
        public string CTYNAME { get; set; }

        public int SEX { get; set; }

        public int ORIGIN { get; set; }

        public int AGEGRP { get; set; }

        public int IMPRACE { get; set; }

        public int RESPOP { get; set; }

        [Key]
        public int CENSUS_ID { get; set; }
    }
}
