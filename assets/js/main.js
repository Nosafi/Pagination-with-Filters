(function init() {
  test = new WorkWithMass(data);

  test.tableDraw(1);
  event();
})();

function WorkWithMass(array) {
  this.array = array;
  this.array_reserv = array;
  this.regular_mass = [];

  this.tableDraw = function(page_num) {
    let type = {
      1: "Без скидки",
      2: "Скидка по программе",
      3: "Временная скидка",
      4: "Постоянная скидка"
    };
    let str = "",
      first_item = 0,
      last_item = 0;

    let buttons = document.getElementsByClassName("pagebuttons_wrapper")[0];
    let current_page = document.getElementsByClassName("current_page")[0];

    let page_coll = Math.ceil(this.array.length / 10);

    buttons.innerHTML = "";
    current_page.innerHTML = page_num;

    for (let i = 0; i < page_coll; i++) {
      buttons.innerHTML +=
        "<input class='page_bnt' type='button' value='" +
        (i + 1) +
        "' onclick='page_listener(" +
        (i + 1) +
        ")'> ";
    }

    last_item = page_num * 10 - 1;
    first_item = last_item - 9;

    for (let i = first_item; i <= last_item; i++) {
      if (this.array.indexOf(this.array[i]) != -1) {
        str +=
          "<tr>" +
          "<td>" +
          this.array[i].name +
          "</td>" +
          "<td>" +
          this.array[i].price +
          "</td>" +
          '<td style="width: 20px;"><div class="' +
          (this.array[i].presence ? "alert-success" : "alert-danger") +
          '" role="alert">&nbsp;</div></td>' +
          "<td>" +
          type[this.array[i].type] +
          "</td>" +
          "<td>" +
          this.array[i].area +
          "</td>" +
          "</tr>";
      }
    }

    $(".product-table tbody").html(str);
  };

  this.array_filter = function(type, price_val, empty_checker, sort_checker) {
    this.array = this.array_reserv;

    let arrayOfPrice = [];
    let max = 0,
      min = 0,
      defaul_max = 0,
      defaul_min = 0;

    if (type != null) {
      this.regular_mass = this.array.filter(function(item) {
        if (item.type == type) {
          return item;
        }
      });
      this.array = this.regular_mass;
    }

    for (let i = 0; i < this.array.length; i++) {
      arrayOfPrice[i] = this.array[i].price;
    }
    defaul_min = Math.min.apply(null, arrayOfPrice);
    defaul_max = Math.max.apply(null, arrayOfPrice);

    if (price_val != null) {
      let numbers = price_val.split("-");
      min = numbers[0];
      max = numbers[1];
    } else {
      min = defaul_min;
      max = defaul_max;
    }

    this.regular_mass = this.array.filter(function(item) {
      if (item.price >= min && item.price <= max) {
        return item;
      }
    });
    this.array = this.regular_mass;

    if (empty_checker) {
      this.regular_mass = this.array.filter(function(item) {
        if (item.presence == true) {
          return item;
        }
      });
      this.array = this.regular_mass;
    }

    if (sort_checker) {
      this.array.sort(function(a, b) {
        return a.price - b.price;
      });
    }

    this.tableDraw(1);
  };
}

function event() {
  $(".sale-control-5").on("click", function() {
    test.array_filter(
      $(".sale-control").val(),
      $(".sale-control-2").val(),
      $(".sale-control-3").prop("checked"),
      $(".sale-control-4").prop("checked")
    );
  });
}

function page_listener(page_num) {
  test.tableDraw(page_num);
}
