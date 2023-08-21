function fetchData() {
    fetch("./GamesPatch.json")
        .then(response => {
            return response.json();
        })
        .then(value => {
            jsonData = value
            for (var name in jsonData) {
                var card = document.createElement("div");
                card.className = "card";
                card.id = name;

                var inside = document.createElement("div");
                inside.className = "card-inside";

                var front = document.createElement("div");
                front.className = "card-front";


                var text = document.createElement("div");
                text.className = "card-text";

                var title = document.createElement("h1");
                title.innerHTML = name;

                var year = document.createElement("h2");
                year.innerHTML = jsonData[name]["releaseYear"];
                year.classList.add("year");

                var company = document.createElement("h3");
                company.innerHTML = jsonData[name]["company"];
                company.classList.add("company");

                text.appendChild(title);
                text.appendChild(year);
                text.appendChild(company);


                var img = document.createElement("img");
                img.src = jsonData[name]["picURL"];
                img.alt = name;
                front.appendChild(img);
                front.appendChild(text);

                var back = document.createElement("div");
                back.className = "card-back";

                var engine = document.createElement("h1");
                engine.innerHTML = jsonData[name]["engine"];
                engine.classList.add("engine");

                var genres = document.createElement("div");
                genres.classList.add("genres");


                for (var genreName in jsonData[name]["genres"]) {
                    var genre = document.createElement("h2");
                    genre.classList.add("genre");
                    genre.innerHTML = jsonData[name]["genres"][genreName];
                    genres.appendChild(genre);
                }


                var patches = document.createElement("div");
                patches.classList.add("patches");

                for (var patchIdx in jsonData[name]["patches"]) {
                    var patch = document.createElement("div");
                    patch.classList.add("patch");

                    var link = document.createElement("a");
                    link.classList.add("patchLink");
                    link.href = jsonData[name]["patches"][patchIdx]["URL"]


                    var patcherImg = document.createElement("img");
                    patcherImg.classList.add("patcherImg");
                    patcherImg.alt = jsonData[name]["patches"][patchIdx]["patcher"];
                    switch (jsonData[name]["patches"][patchIdx]["patcher"]) {
                        case "GameSub":
                            patcherImg.src = "Images/Patcher/GameSub.png";
                            break;
                        case "FarsiSaz":
                            patcherImg.src = "Images/Patcher/FarsiSaz.png";
                            break;
                        case "SubRan":
                            patcherImg.src = "Images/Patcher/SubRan.png";
                            break;
                        case "TeamFa":
                            patcherImg.src = "Images/Patcher/TeamFa.png";
                            break;
                        case "Hayoola":
                            patcherImg.src = "Images/Patcher/Hayoola.png";
                            break;
                        case "Mohsening":
                            patcherImg.src = "Images/Patcher/Mohsening.png";
                            break;
                        case "Par30Game":
                            patcherImg.src = "Images/Patcher/Par30Game.png";
                            break;
                    }
                    var platformImg = document.createElement("img");
                    platformImg.classList.add("platformImg");
                    platformImg.alt = jsonData[name]["patches"][patchIdx]["platform"];
                    switch (jsonData[name]["patches"][patchIdx]["platform"]) {
                        case "PC":
                            platformImg.src = "Images/Platform/PC.png";
                            break;
                        case "PS4":
                            platformImg.src = "Images/Platform/PS4.png";
                            break;
                        case "PS3":
                            platformImg.src = "Images/Platform/PS3.png";
                            break;
                        case "NintendoSwitch":
                            platformImg.src = "Images/Platform/NintendoSwitch.png";
                            break;
                    }
                    // patch.innerHTML = jsonData[name]["patches"][patchIdx]["platform"];
                    link.appendChild(patcherImg);
                    link.appendChild(platformImg);
                    patch.appendChild(link);
                    patches.appendChild(patch);
                }


                back.appendChild(engine);
                back.appendChild(genres);
                back.appendChild(patches);


                inside.appendChild(front);
                inside.appendChild(back);

                card.appendChild(inside);
                document.getElementById("body").appendChild(card);
            }
            addClickEventToCards();
            initCards();
        });
}

function sortCards(mode, type) {
    if (groupBy === 'none') {
        sortType = type;
        if (mode === "Name")
            sortByName();
        else if (mode === "Year")
            sortByYear();
        sortMode = mode;
    }
}

function sortByName() {
    $('.card').sort(function (a, b) {
        return a.id.localeCompare(b.id) * (sortType === "ASC" ? 1 : -1);
    }).appendTo($("#body"));
}

function sortByYear() {
    $('.card').sort(function (a, b) {
        var yearA = parseInt($(a).find('.year').html());
        var yearB = parseInt($(b).find('.year').html());
        return (yearA < yearB ? -1 : 1) * (sortType === "ASC" ? 1 : -1);
    }).appendTo($("#body"));
}

function groupCards() {
    unGroup();
    if (groupBy === "Engine")
        groupByEngine();
    if (groupBy === "Genre")
        groupByGenre();
    if (groupBy === "Company")
        groupByCompany();
    if (groupBy === "Patcher")
        groupByPatcher();
    if (groupBy === "Platform")
        groupByPlatform();
    addClickEventToCards();
}

function addClickEventToCards() {
    var cardInsides = document.querySelectorAll('.card-inside');
    [...cardInsides].forEach((card) => {
        card.addEventListener('click', function () {
            card.classList.toggle('is-flipped');
        });
    });
}

function unGroup() {
    $('.card').each(function (index) {
        hasThis = false;
        card = this;
        $('#body').find('.card').each(function (c) {
            if (this.id === card.id)
                hasThis = true;
        })
        if (hasThis === false)
            $("#body").append(this);
    });
    $('.Part').each(function (c) {
        this.remove();
    })
    addClickEventToCards();
    sortCards(sortMode, sortType)
}

function groupByEngine() {
    var tags = new Set();
    var engines = document.querySelectorAll('.engine');
    [...engines].forEach((engine) => {
        tags.add(engine.innerHTML)
    });
    const sortedArray = [...tags].sort();
    tags = new Set(sortedArray);
    [...tags].forEach((engine) => {
        var part = document.createElement("div");
        part.id = engine;
        part.className = "Body";
        part.classList.toggle('Part');

        var partTitle = document.createElement("h1");
        partTitle.className = "PartTitle";
        partTitle.innerHTML = engine;

        part.appendChild(partTitle);
        document.getElementById("main").appendChild(part);
        $('#body').find('.card').each(function (c) {
            if ($(this).find('.engine').html() === engine)
                part.appendChild(this);
        })
    });
}

function groupByCompany() {
    var tags = new Set();
    var companies = document.querySelectorAll('.company');
    [...companies].forEach((company) => {
        tags.add(company.innerHTML)
    });
    const sortedArray = [...tags].sort();
    tags = new Set(sortedArray);
    [...tags].forEach((company) => {
        var part = document.createElement("div");
        part.id = company;
        part.className = "Body";
        part.classList.toggle('Part');

        var partTitle = document.createElement("h1");
        partTitle.className = "PartTitle";
        partTitle.innerHTML = company;

        part.appendChild(partTitle);
        document.getElementById("main").appendChild(part);
        $('#body').find('.card').each(function (c) {
            if ($(this).find('.company').html() === company)
                part.appendChild(this);
        })
    });
}

function groupByGenre() {
    var tags = new Set();
    var genres = document.querySelectorAll('.genre');
    [...genres].forEach((genre) => {
        tags.add(genre.innerHTML)
    });
    const sortedArray = [...tags].sort();
    tags = new Set(sortedArray);
    [...tags].forEach((genre) => {
        var part = document.createElement("div");
        part.id = genre;
        part.className = "Body";
        part.classList.toggle('Part');

        var partTitle = document.createElement("h1");
        partTitle.className = "PartTitle";
        partTitle.innerHTML = genre;

        part.appendChild(partTitle);
        document.getElementById("main").appendChild(part);
        $('#body').find('.card').each(function (c) {
            if (jsonData[this.id]['genres'].indexOf(genre) > -1)
                part.appendChild(this.cloneNode(true));
        })
    });
    $('#body').empty();
}

function groupByPatcher() {
    var tags = new Set();
    var patchers = document.querySelectorAll('.patcherImg');
    [...patchers].forEach((patcher) => {
        tags.add(patcher.alt);
    });
    const sortedArray = [...tags].sort();
    tags = new Set(sortedArray);
    [...tags].forEach((patcher) => {
        var part = document.createElement("div");
        part.id = patcher;
        part.className = "Body";
        part.classList.toggle('Part');

        var partTitle = document.createElement("h1");
        partTitle.className = "PartTitle";
        partTitle.innerHTML = patcher;

        part.appendChild(partTitle);
        document.getElementById("main").appendChild(part);
        $('#body').find('.card').each(function (c) {
            var patchersName = new Set();
            for (var patchIdx in jsonData[this.id]["patches"]) {
                patchersName.add(jsonData[this.id]["patches"][patchIdx]["patcher"])
            }
            if (patchersName.has(patcher))
                part.appendChild(this.cloneNode(true));
        })
    });
    $('#body').empty();
}

function groupByPlatform() {
    var tags = new Set();
    var platforms = document.querySelectorAll('.platformImg');
    [...platforms].forEach((platform) => {
        tags.add(platform.alt);
    });
    const sortedArray = [...tags].sort();
    tags = new Set(sortedArray);
    [...tags].forEach((platform) => {
        var part = document.createElement("div");
        part.id = platform;
        part.className = "Body";
        part.classList.toggle('Part');

        var partTitle = document.createElement("h1");
        partTitle.className = "PartTitle";
        partTitle.innerHTML = platform;

        part.appendChild(partTitle);
        document.getElementById("main").appendChild(part);
        $('#body').find('.card').each(function (c) {
            var platformsName = new Set();
            for (var patchIdx in jsonData[this.id]["patches"]) {
                platformsName.add(jsonData[this.id]["patches"][patchIdx]["platform"])
            }
            if (platformsName.has(platform))
                part.appendChild(this.cloneNode(true));
        })
    });
    $('#body').empty();
}