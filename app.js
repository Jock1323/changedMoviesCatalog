let searchNumber = document.querySelector('.resultnumber');
let elUnordered = document.querySelector('.list');
let elForm = document.querySelector('.form');
let elSelect = document.querySelector('.select');
let elTable=document.querySelector('.table');
searchNumber.textContent = films.length;
let selectarr = [];
let localData=JSON.parse(window.localStorage.getItem('films'))
let bookmarked=localData || [];
//select menu
let selectMenu = (fullArray) => {
    fullArray.forEach(item => {
        item.genres.forEach(element => {
            if (!(selectarr.includes(element))) selectarr.push(element);
        })
    })
    selectarr.forEach(options => {
        let elOption = document.createElement('option');
        elOption.textContent = options;
        elSelect.appendChild(elOption);
    })
}
selectMenu(films)
// sort genres
let sortCards = fullArray => {
    arr = fullArray.filter(item => item.genres.includes(elSelect.value))
}
// Bookmark
elUnordered.addEventListener('click',(evt)=>{
    let connectBookmark=evt.target.dataset.bookmark;
    let findElement=films.find(item=>item.id===connectBookmark)
    let connectInfo=evt.target.dataset.moreInfo;
    let findModalIndex=films.findIndex(item=>item.id===connectInfo);
    if(evt.target.matches('.bookmark')){
        if(!bookmarked.includes(findElement)){
            bookmarked.push(findElement);
        }
        window.localStorage.setItem('films',JSON.stringify(bookmarked));
        elTable.innerHTML=null;
        renderBookmarkeds(bookmarked);
    }
})

// Remove bookmarked elements from the table
elTable.addEventListener('click',(evt)=>{
    let removeBookmark=evt.target.dataset.removeBookmarked;
    let findIndex=films.find(item=>item.id===removeBookmark);
    if(evt.target.matches('.remove')){
        bookmarked.splice(findIndex,1);
        elTable.innerHTML=null;
        window.localStorage.setItem('films',JSON.stringify(bookmarked));
        if(bookmarked.length===0){
            window.localStorage.removeItem('films');
        }
        renderBookmarkeds(bookmarked);
    }
})

// search btn click
elForm.addEventListener('submit', evt => {
    evt.preventDefault();
    elUnordered.innerHTML = null
    sortCards(films)
    if (elSelect.value === 'all') {
        searchNumber.textContent = films.length
        renderMovies(films)
    }
    else{
        renderMovies(arr);
        searchNumber.textContent = arr.length
    }
})
sortCards(films)

// Render Bookmarkeds
let renderBookmarkeds=(bookmarkedArray)=>{
    bookmarked.forEach(element => {
        let tableRow=document.createElement('tr');
        let tableData=document.createElement('td');
        let tableDataTitle=document.createElement('h4');
        let tableDataRemoveBtn=document.createElement('a');

        // set table data attributes
        tableDataRemoveBtn.setAttribute('class','btn btn-outline-danger');
        tableDataRemoveBtn.classList.add('remove');
        // set text content
        tableDataTitle.textContent=element.title;
        tableDataRemoveBtn.textContent='Remove'

        // add dataset to remove buttons
        tableDataRemoveBtn.dataset.removeBookmarked=element.id;

        //initialize table elements
        elTable.appendChild(tableRow);
        tableRow.appendChild(tableData);
        tableData.appendChild(tableDataTitle);
        tableData.appendChild(tableDataRemoveBtn);
    
    });
}
renderBookmarkeds(bookmarked);
//RenderMovies
let renderMovies = (fullArray) => {
    fullArray.forEach(item => {
        let elList = document.createElement('li');
        let elImg = document.createElement('img');
        let elDiv = document.createElement('div');
        let elTitle = document.createElement('h5');
        let elBtn = document.createElement('a');
        let elInfoBtn=document.createElement('a');
        let elBookmarkBtn=document.createElement('a');
        let elModal=document.createElement('div');

        // set attributes
        elModal.classList.add('modal__window')
        elList.setAttribute('class', 'card mt-4');
        elList.style.position='relative';
        elImg.setAttribute('class', 'card-header');
        elImg.setAttribute('src', item.poster);
        elDiv.setAttribute('class', 'card-body');
        elTitle.setAttribute('class', 'card-title');
        elBtn.setAttribute('href', 'https://picsum.photos')
        elBtn.setAttribute('class', 'btn-outline-danger btn')
        elInfoBtn.setAttribute('class','btn btn-outline-info more__info')
        elBookmarkBtn.setAttribute('class','btn btn-outline-primary bookmark')

        // text content
        elTitle.textContent = item.title;
        elBtn.textContent = "Watch Trailer"
        elInfoBtn.textContent="More Info"
        elBookmarkBtn.textContent='Bookmark'

        // add dataset
         elBookmarkBtn.dataset.bookmark=item.id;

        //initialize created elements
        elUnordered.appendChild(elList);
        elList.appendChild(elImg);
        elList.appendChild(elDiv);
        elDiv.appendChild(elTitle);
        elDiv.appendChild(elBtn);
        elDiv.appendChild(elInfoBtn);
        elDiv.appendChild(elBookmarkBtn);
    });
   
}
renderMovies(films)

