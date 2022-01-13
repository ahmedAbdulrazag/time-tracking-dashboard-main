
const model = {
    JSONData: [],
    svgPaths: [
        {
            'Work': './icons/work.svg'
        }, 
        {
            'Play': './icons/play.svg'
        },
        {
            'Study': './icons/study.svg'
        }, 
        {
            'Exercise': './icons/exercise.svg'
        },
        {
            'Social': './icons/social.svg'
        }, 
        {
            'Self Care': './icons/selfcare.svg'
        },
    ],
    async init() {
        try {
            const res = await fetch('data.json')
            if(res.ok) {
                const data = await res.json()

                for(let i = 0; i < data.length; i++) {
                    this.JSONData.push(data[i])
                }

                return data
            }
        } catch(err) {
            console.error(err)
        }
    },
    

}

const controller = {
    init() {
        model.init()
        view.init()
    }, 

    getJSONData() {
        return model.JSONData
    },

    getSvgPaths() {
        return model.svgPaths
    },

    handleClickEvent(e) {
        const button = e.target
        button.classList.add('active')

        // pass button's innerText 
        this.renderDataByDuration(e.target.innerText)
    },

    renderDataByDuration(button) {
        if(button === 'Daily') {
            view.render(this.getDailyData())
         } else if(button === 'Weekly') { 
            view.render(this.getWeeklyData())
        } else {
            view.render(this.getMonthlyData())
        }

    },

    getDailyData() {
        const data = this.getJSONData()
        const dailyData = data.map(item => {
            return {
                title: item.title,
                timeframes: item.timeframes.daily,
                summary: 'Yesterday'
            }
        })
        return dailyData
    },
    
    getWeeklyData() {
        const data = this.getJSONData()
        const weeklyData = data.map(item => {
            return {
                title: item.title,
                timeframes: item.timeframes.weekly,
                summary: 'Last Week'
            }
        })
        return weeklyData
    },
    
    getMonthlyData() {
        const data = this.getJSONData()
        const monthlyData = data.map(item => {
            return {
                title: item.title,
                timeframes: item.timeframes.monthly,
                summary: 'Last Month'
            }
        })
        return monthlyData
    },




    removeActiveClass(buttons) {
        // remove active class from all the buttons 
        // so we can add it on the clicked button only
        buttons.forEach(button => button.classList.remove('active'))
    },

    addActiveClass(clickedButton) {
        // add a active class on the clicked button
        clickedButton.classList.add('active')
    },
}

const view = {
    init() {
        // Select and store all our buttns in an array 
        this.navigationButtons = [...document.querySelectorAll('.navigation-button')]  

        this.cardsContainer = document.querySelector('[data-cards-container]')
        this.firstCardsRow = document.querySelector('[data-first-cards-row]')
        this.secondCardsRow = document.querySelector('[data-second-cards-row]')
     
        // Add a click event 
        this.navigationButtons.forEach(button => button.addEventListener('click', e => {
            // Remove .active class from all buttons 
            controller.removeActiveClass(this.navigationButtons)

            console.log({'clickedButton': e.target.innerText})
            // Now handel the event 
            controller.handleClickEvent(e)
        }))

        
    },

    render(data) {
        this.firstCardsRow.innerHTML = ''
        this.secondCardsRow.innerHTML = ''
        

        
        const svgPaths = controller.getSvgPaths()


        for(let i = 0; i < 3; i++) {
            this.firstCardsRow.innerHTML += `
            <div class ="col-lg-4 col-sm-12">
                <div class="box">
                    <div class="box-background ${data[i].title.toLowerCase()}">
                        <img src="${svgPaths[i][data[i].title]}">   
                    </div>

                    <div class="box-main-content">
                        <div class="title-and-ellipsis">
                            <h6 class="px-4 pt-2 card-title">${data[i].title}</h6>
                            <svg width="21" height="5" id="ellipsis" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
                        </div>
                        
                        <div class="row">
                            <div class="col-lg-12 col-sm-4 col-4">
                                <h1 class="px-4" id ="time-work">${data[i].timeframes.current}hrs</h1>
                            </div>
                            <div class="col-lg-12 col-sm-8 col-8">
                                <h6 class=" px-4 text-muted previous">${data[i].summary} - <span id="previous-time-work">${data[i].timeframes.previous}rs</span></h6>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            `
        }
        for(let i = 3; i < 6; i++) {
            this.firstCardsRow.innerHTML += `
            <div class ="col-lg-4 col-sm-12">
                <div class="box">
                    <div class="box-background ${(data[i]?.title.toLowerCase() == 'self care' ? 'selfcare' : data[i].title.toLowerCase())}">
                        <img src="${svgPaths[i][data[i].title]}">
                    </div>

                    <div class="box-main-content">
                        <div class="title-and-ellipsis">
                            <h6 class="px-4 pt-2 card-title">${data[i].title}</h6>
                            <svg width="21" height="5" id="ellipsis" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
                        </div>
                        
                        <div class="row">
                            <div class="col-lg-12 col-sm-4 col-4">
                                <h1 class="px-4" id ="time-work">${data[i].timeframes.current}hrs</h1>
                            </div>
                            <div class="col-lg-12 col-sm-8 col-8">
                                <h6 class=" px-4 text-muted previous">${data[i].summary} - <span id="previous-time-work">${data[i].timeframes.previous}rs</span></h6>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            `
        }


    }
}

controller.init()


























































/*
                                <div class ="col-lg-4 col-sm-12">
                                    <div class="box">
                                        <div class="box-background-work">
                                            <svg width="79" height="79" xmlns="http://www.w3.org/2000/svg"><path d="m18.687 10.43 15.464 30.906c.31.682.743 1.322 1.3 1.88.558.557 1.198.99 1.714 1.217L68.237 59.98 52.484 75.732a8.025 8.025 0 0 1-11.355 0L2.934 37.538a8.025 8.025 0 0 1 0-11.356L18.687 10.43Zm19.345-7.99 10.839 10.838 2.065-2.064a5.845 5.845 0 0 1 8.258 0l8.258 8.259a5.845 5.845 0 0 1 0 8.258l-2.064 2.064 10.839 10.84a8.025 8.025 0 0 1 0 11.355l-4.728 4.728L39.126 40.53a1.963 1.963 0 0 1-.578-.413 1.963 1.963 0 0 1-.413-.578L21.95 7.168l4.728-4.728a8.025 8.025 0 0 1 11.355 0Zm17.033 12.903-2.064 2.065 8.258 8.258 2.064-2.064-8.258-8.259Z" fill="#D96C47" fill-rule="nonzero"/></svg>
                                        </div>
            
                                        <div class="box-main-content">
                                            <div class="title-and-ellipsis">
                                                <h6 class="px-4 pt-2 card-title">Work</h6>
                                                <svg width="21" height="5" id="ellipsis" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-lg-12 col-sm-4 col-4">
                                                    <h1 class="px-4" id ="time-work">32hrs</h1>
                                                </div>
                                                <div class="col-lg-12 col-sm-8 col-8">
                                                    <h6 class=" px-4 text-muted previous">Last Week - <span id="previous-time-work">36hrs</span></h6>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
*/