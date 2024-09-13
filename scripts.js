function addCarousselCard(data) {
    $("#carousel-for-quotes").append(
      $(
        `${
          data.id === 1
            ? "<div class='carousel-item active'>"
            : "<div class='carousel-item'>"
        }`
      ).append(
        $("<div class='row mx-auto align-items-center'>").append(
          $(
            "<div class='col-12 col-sm-2 col-lg-2 offset-lg-1 text-center'>"
          ).append(
            $(
              `<img src="${data.pic_url}" class="d-block align-self-center" alt="Carousel Pic ${data.id}">`
            )
          ),
          $(
            "<div class='col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0'>"
          ).append(
            $("<div class='quote-text'>").append(
              $("<p class='text-white'>").text(data.text),
              $("<h4 class='text-white font-weight-bold'>").text(data.name),
              $("<span class='text-white'>").text(data.title)
            )
          )
        )
      )
    );
  }
  
  function listQuotes() {
    const url = "https://smileschool-api.hbtn.info/quotes";
  
    $(document).ready(function () {
      $.ajax({
        url: url,
        data: {
          action: "query",
          format: "json",
          origin: "*",
        },
        method: "GET",
        dataType: "json",
        crossDomain: true,
        beforeSend: function () {
          $(".loader").show();
        },
        success: function (msg) {
          $(".loader").hide();
        },
      }).done(function (data) {
        for (let i = 0; i < data.length; i++) {
          addCarousselCard(data[i]);
        }
      });
    });
  }
  
  listQuotes();


  function addCarouselCardTutorials(data) {
    const carouselInner = $("#carouselExampleControls3 .carousel-inner");
  

    carouselInner.empty();
  

    data.forEach((video, index) => {

      const activeClass = index === 0 ? 'active' : '';
  

      const carouselItem = $(`
        <div class="carousel-item ${activeClass}">
          <div class="row align-items-center mx-auto">
            <div class="col-12 d-flex justify-content-center">
              <div class="card">
                <img src="${video.thumbnail_url}" class="card-img-top" alt="Video thumbnail">
                <div class="card-img-overlay text-center">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${video.title}</h5>
                  <p class="card-text text-muted">${video.description}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle">
                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">
                      ${'<img src="images/star_on.png" alt="star on" width="15px">'.repeat(video.rating)}
                      ${'<img src="images/star_off.png" alt="star off" width="15px">'.repeat(5 - video.rating)}
                    </div>
                    <span class="main-color">${video.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
  
      carouselInner.append(carouselItem);
    });
  }
  
  function listPopularTutorials() {
    const url = "https://smileschool-api.hbtn.info/popular-tutorials";
  
    $(document).ready(function () {
      $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        crossDomain: true,
        beforeSend: function () {
          $(".loader").show();
        },
        success: function () {
          $(".loader").hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error fetching data:", textStatus, errorThrown);
          $(".loader").hide();
        }
      }).done(function (data) {
        if (Array.isArray(data) && data.length > 0) {
          addCarouselCardTutorials(data);
        }
      });
    });
  }
  
  listPopularTutorials();


  function addCarouselCardLatestVideos(data) {
    const carouselInner = $("#carouselExampleControlsLatest .carousel-inner");

    carouselInner.empty();

    data.forEach((video, index) => {
        const activeClass = index === 0 ? 'active' : '';

        const carouselItem = $(`
            <div class="carousel-item ${activeClass}">
                <div class="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                    <div class="card">
                        <img src="${video.thumbnail_url}" class="card-img-top" alt="Video thumbnail">
                        <div class="card-img-overlay text-center">
                            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold">${video.title}</h5>
                            <p class="card-text text-muted">${video.sub_title}</p>
                            <div class="creator d-flex align-items-center">
                                <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle">
                                <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                            </div>
                            <div class="info pt-3 d-flex justify-content-between">
                                <div class="rating">
                                    ${'<img src="images/star_on.png" alt="star on" width="15px">'.repeat(video.star)}
                                    ${'<img src="images/star_off.png" alt="star off" width="15px">'.repeat(5 - video.star)}
                                </div>
                                <span class="main-color">${video.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        carouselInner.append(carouselItem);
    });
}

function listLatestVideos() {
    const url = "https://smileschool-api.hbtn.info/latest-videos";

    $(document).ready(function () {
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            crossDomain: true,
            beforeSend: function () {
                $(".loader").show();  // Afficher le loader avant de commencer la requête
            },
            success: function () {
                $(".loader").hide();  // Cacher le loader lorsque les données sont reçues
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error fetching data:", textStatus, errorThrown);
                $(".loader").hide();  // Cacher le loader même en cas d'erreur
            }
        }).done(function (data) {
            if (Array.isArray(data) && data.length > 0) {
                addCarouselCardLatestVideos(data);
            }
        });
    });
}

listLatestVideos();

