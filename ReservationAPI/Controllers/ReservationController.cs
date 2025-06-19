using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using ReservationAPI.Models;
using ReservationAPI.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private IRepository repository;
        private IWebHostEnvironment webHostEnvironment;

        public ReservationController(IRepository repo, IWebHostEnvironment environment)
        {
            repository = repo;
            webHostEnvironment = environment;
        }

        // GET api/reservation
        [HttpGet]
        public IEnumerable<Reservation> Get() => repository.Reservations;

        // GET api/reservation/5
        [HttpGet("{id}")]
        public ActionResult<Reservation> Get(int id)
        {
            if (id == 0)
                return BadRequest("Value must be passed in the request body.");
            return Ok(repository[id]);
        }

        // POST api/reservation
        [HttpPost]
        public Reservation Post([FromBody] Reservation res) =>
            repository.AddReservation(new Reservation
            {
                Name = res.Name,
                StartLocation = res.StartLocation,
                EndLocation = res.EndLocation
            });

        // PUT api/reservation
        [HttpPut]
        public Reservation Put([FromForm] Reservation res) =>
            repository.UpdateReservation(res);

        // DELETE api/reservation/5
        [HttpDelete("{id}")]
        public void Delete(int id) => repository.DeleteReservation(id);

        // Utility method for simple API key check (can be used in any action)
        private bool Authenticate()
        {
            var allowedKeys = new[] { "secret123", "Secret#12", "secretABC" };
            StringValues key = Request.Headers["Key"];
            int count = (from t in allowedKeys where t == key select t).Count();
            return count == 0 ? false : true;
        }

        // POST XML: api/reservation/postxml
        [HttpPost("postxml")]
        [Consumes("application/xml")]
        public Reservation PostXml([FromBody] XElement res)
        {
            return repository.AddReservation(new Reservation
            {
                Name = res.Element("Name").Value,
                StartLocation = res.Element("StartLocation").Value,
                EndLocation = res.Element("EndLocation").Value
            });
        }

        // GET with format negotiation: api/reservation/showreservation.json or .xml
        [HttpGet("showreservation.{format}")]
        [FormatFilter]
        public IEnumerable<Reservation> ShowReservation() =>
            repository.Reservations;
    }
}
