let myLeads = []
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")

inputBtn.addEventListener("click", function() {
    console.log("Button Clicked")
})

function render(leads){
    let listItems=""
    for(let i=0; i<leads.length; i++){
        listItems+=`
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
        
    }
    ulEl.innerHTML=listItems
}
const tabs=[
    {url:"https://www.linkedin.com/in/per-harald-borgen/"}
]

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)
if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

