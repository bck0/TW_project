
var button_next = document.querySelector('#next');
var button_prev = document.querySelector('#prev');
var button_random = document.querySelector('#random');
var button_favorite = document.querySelector('#favorite');
var url = "https://www.breakingbadapi.com/api/characters/";
var number = 1;
var id = 1;
var name = '';

let favorites = [];

show(number);
adding();
button_prev.setAttribute('disabled', 'disable');

function first(number) {
    if (number === 1) {
        button_prev.setAttribute('disabled', 'disable');
    }
    else {
        button_prev.removeAttribute('disabled')
    }
}

function last(number) {
    if (number === 57) {
        button_next.setAttribute('disabled', 'disable');
    }
    else {
        button_next.removeAttribute('disabled')
    }

}


button_next.onclick = function () {
    number++;
    show(number);
}
button_prev.onclick = function () {
    if (number !== 1) {
        number--;
        show(number);
    }
}

button_random.onclick = function () {
    number = Math.floor(Math.random() * 57) + 1;
    show(number);

}

button_favorite.onclick = function () {
    if (localStorage.getItem('history') !== null) {
        favorites = JSON.parse(localStorage.getItem('history'));
    }
    let include = false;
    favorites.forEach(item => {
        if (item.name === name) {
            include = true;
        }
    })
    if (include === true) {
        var alt = document.getElementById('alert');
        alt.innerHTML += '<div class="alert alert-danger" role="alert"> Character is already in list!</div >'
        setTimeout(() => { alt.innerHTML = '' }, 2000);
    }
    else {

        favorites.push({
            id: id,
            name: name
        })
        localStorage.setItem('history', JSON.stringify(favorites))
        adding();
    }

}

function show(local) {
    fetch(url + local)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var icon = data[0].img;
            name = data[0].name;
            id = data[0].char_id;
            var nickname = data[0].nickname;
            var status = data[0].status;
            var portrayed = data[0].portrayed;
            var birthday = data[0].birthday;
            var appearance = data[0].appearance;
            var occ = document.getElementById('occ_ID');
            $(".card-img-top").attr("src", icon);
            document.getElementById('name').innerHTML = name;
            document.getElementById('nickname').innerHTML = nickname;
            document.getElementById('status').innerHTML = status;
            document.getElementById('portrayed').innerHTML = portrayed;
            document.getElementById('birthday').innerHTML = birthday;
            occ.innerHTML = "";
            for (i = 0; i < data[0].occupation.length; i++) {
                occ.innerHTML += '<li class="list-group-item" >' + data[0].occupation[i] + '</li>';
            }
            var app = document.getElementById('appearance');
            app.innerHTML = "";
            for (j = 0; j < appearance.length; j++) {
                app.innerHTML += '<li class="list-group-item" >' + data[0].appearance[j] + '</li>';
            }
            first(local);
            last(local);
            number = local;

        });


}

function adding() {
    const history = JSON.parse(localStorage.getItem('history'));
    if (localStorage.getItem('history') !== null) {
        fav_id = document.getElementById('fav_id');
        fav_id.innerHTML = ''
        let index = 0;
        history.forEach(item => {

            fav_id.innerHTML += '<div class="d-flex justify-content-between"><button type="button" class="list-group-item list-group-item-action mybutton" onclick="show(' + item.id + ')">' + item.name + '</button>  <button class="btn btn-danger" onclick="remove(' + index + ')"><i class="fa fa-trash"></i></button></div>'
            index++;


        });
    }
}

function remove(index) {

    const history = localStorage.getItem('history');
    arr = JSON.parse(history);
    arr.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(arr));
    adding();

}



