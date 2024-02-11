namespace API_Project.Model
{
    public class FilterParams
    {
        public string? sortBy { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalProducts { get; set; }

        public string? FBboughtfrom { get; set; }

        public string? FBcategory { get; set; }

        public string? Search { get; set; }

        

        //public bool isSortBy { get; set; }
    }
}
