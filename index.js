async function getData() {
  let result = await fetch(
    "https://www.randombeauty.dk/wp-recreate/wp-json/wp/v2/bikes?_embed"
  );
  dataReceived(await result.json());
}

function dataReceived(data) {
  //do something with the data
  console.log(data);

  data.forEach(showSingleBike);
  //postMessage.forEach((post) => {
  //console.log(hello, post);
}

function showSingleBike(bike) {
  //template
  const template = document.querySelector("template").content;
  //clone
  const clone = template.cloneNode(true);
  console.log(bike);
  //put the content into it
  clone.querySelector("h3").textContent = bike.title.rendered;
  clone.querySelector(".price span").textContent = bike.price;
  clone.querySelector(".stock span").textContent = bike.in_stock;
  //append it to the dom
  clone.querySelector("img").src =
    bike._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
  clone.querySelector("h4").textContent = bike._embedded["wp:term"][0][0].name;
  //console.log(wp_embedded.wp["featuredmedia"].0.media_details.sizes.medium.source_url);
  if (bike.colours[0]) {
    clone.querySelector(".colour-list").textContent = "";
    bike.colours.forEach((colour) => {
      const spanEl = document.createElement("span");
      spanEl.style.background = colour;
      console.log(spanEl);
      clone.querySelector(".colour-list").appendChild(spanEl);
    });
  }
  const parent = document.querySelector("main");
  parent.appendChild(clone);
}

getData();
