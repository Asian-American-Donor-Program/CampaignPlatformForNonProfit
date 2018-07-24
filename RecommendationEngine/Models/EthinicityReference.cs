namespace RecommendationEngine.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("EthinicityReference")]
    public partial class EthinicityReference
    {
        [Key]
        public int Ethinicity_ID { get; set; }

        public int Ethinicity_Code { get; set; }

        [Required]
        [StringLength(500)]
        public string Ethinicity_Value { get; set; }
    }
}
