using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Music_API_V3.Models
{
    public class Artist
    {
        [Key]
        public int ID { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Cover_Image_Name { get; set; }

        [NotMapped]
        public IFormFile Cover_Image_File { get; set; }

    }
}
