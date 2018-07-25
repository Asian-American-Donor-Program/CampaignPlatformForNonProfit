namespace RecommendationEngine
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using RecommendationEngine.Models;

    public partial class RecommendationEngineDBContext : DbContext
    {
        public RecommendationEngineDBContext()
            : base("name=RecommendationEngineDBContext")
        {
        }

        public virtual DbSet<CensusInfo> CensusInfoes { get; set; }
        public virtual DbSet<CountyFIP> CountyFIPS { get; set; }
        public virtual DbSet<EthinicityReference> EthinicityReferences { get; set; }
        public virtual DbSet<StateFIP> StateFIPS { get; set; }
        public virtual DbSet<URL> URLs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<URL>()
                .Property(e => e.Platform)
                .IsFixedLength();

            modelBuilder.Entity<URL>()
                .Property(e => e.ContentID)
                .HasPrecision(18, 0);

            modelBuilder.Entity<URL>()
                .Property(e => e.CampaignID)
                .HasPrecision(18, 0);

            modelBuilder.Entity<URL>()
                .Property(e => e.LongURL)
                .IsFixedLength();

            modelBuilder.Entity<URL>()
                .Property(e => e.ShortURL)
                .IsFixedLength();
        }
    }
}
