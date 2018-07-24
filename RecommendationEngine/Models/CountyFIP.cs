namespace RecommendationEngine.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CountyFIPS")]
    public partial class CountyFIP
    {
        [Key]
        public int CountyFIPS_ID { get; set; }

        [Required]
        [StringLength(50)]
        public string State_Abbreviation { get; set; }

        public int State_FIPS_Code { get; set; }

        public int County_FIPS_Code { get; set; }

        public int FIPS_Entity_Code { get; set; }

        public int ANSI_Code { get; set; }

        [Required]
        [StringLength(50)]
        public string GU_Name { get; set; }

        [StringLength(50)]
        public string Entity_Description { get; set; }
    }
}
