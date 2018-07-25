declare @ethnicity as nvarchar(200) = 'Black or African American and White';
with CensusRace
as
(
	select *, 'White' as CensusRace from socialmedia where ethnicity like '%white%'
	union
	select *, 'Black' as CensusRace from socialmedia where ethnicity like '%black%'
	union
	select *, 'American Indian or Alaska Native' as CensusRace from socialmedia where ethnicity like '%american indian%'
	union
	select *, 'Asian' as CensusRace from socialmedia where ethnicity like '%asian%'
	union
	select *, 'Native Hawaiian or Other Pacific Islander' as CensusRace from socialmedia where ethnicity like '%native hawaiian%'
)
select brand, twitterhandle, instagramhandle, domain, subdomain, hometown, ethnicity, interests, count(CensusRace) as Matches from CensusRace
where censusrace in (select value from STRING_SPLIT(@ethnicity, ' ') where value not in ('and','or', 'alone', 'other'))
group by brand, twitterhandle, instagramhandle, domain, subdomain, hometown, ethnicity, interests
order by Matches desc