

function Slider() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/jin.jpg"
            className="d-block w-100"
            alt="..."
            width={100}
            height={600}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Jin Song</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/lucas.PNG"
            className="d-block w-100"
            alt="..."
            width={100}
            height={600}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Lucas De Biasio</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/zoe.png"
            className="d-block w-100"
            alt="..."
            width={100}
            height={600}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Zoe Wong</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/julie.jpg"
            className="d-block w-100"
            alt="..."
            width={100}
            height={600}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Julie Wu</h5>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slider;