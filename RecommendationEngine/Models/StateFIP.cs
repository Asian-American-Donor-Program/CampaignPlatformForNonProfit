namespace RecommendationEngine.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("StateFIPS")]
    public partial class StateFIP
    {
        [Key]
        public int State_ID { get; set; }

        [Required]
        [StringLength(50)]
        public string State_Name { get; set; }

        [Required]
        [StringLength(50)]
        public string State_Code { get; set; }
    }
}
