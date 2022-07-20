const app=()=>{
    const song=document.querySelector('.song');
    const play=document.querySelector('.play');
    const outline= document.querySelector('.moving-outline circle');
    const video=document.querySelector('.vid-container video');

    //SOUNDS
    const sounds=document.querySelectorAll('.sound-picker button');

    //TIME DISPLAY
    const timeDisplay=document.querySelector('.time-display');
    const timeSelect=document.querySelectorAll('.time-select button');
    //Length of circle outline
    const outlineLength=outline.getTotalLength();
    // console.log(outlineLength)

    //Duration
    let fakeDuration=600;

    //Outline Animation
    outline.style.strokeDasharray=outlineLength;
    outline.style.strokeDashoffset=outlineLength;

    // Pick diff theme
    sounds.forEach(sound=>{
        sound.addEventListener('click', function(){
            song.src=this.getAttribute('data-sound');
            video.src=this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // Sound Play
    play.addEventListener('click',()=>{
        checkPlaying(song);
    });


    // Select Sound Duration
    timeSelect.forEach(option=>{
        option.addEventListener('click',function(){
            fakeDuration=this.getAttribute('data-time');
            timeDisplay.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
        });//1st one is for min and 2nd one is for sec
    });

    //To stop and play sound
    const checkPlaying = song=>{
        if(song.paused){
            song.play();
            video.play();
            play.src='./svg/pause.svg';
        }
        else{
            song.pause();
            video.pause();
            play.src='./svg/play.svg';
        }
    };


    // //animation outline Circle with Time
    song.ontimeupdate=()=>{
        let currentTime=song.currentTime;
        let elapsed=fakeDuration-currentTime;
        let seconds=Math.floor(elapsed%60);//when it goes 60 it reset back to 0
        let minutes =Math.floor(elapsed/60);

        //Animate 
        let progress=outlineLength- (currentTime/fakeDuration)*outlineLength;
        outline.style.strokeDashoffset=progress;

        // TextAnimation countdown
        timeDisplay.textContent=`${minutes}:${seconds}`;


        // To stop after time ends
        if(currentTime>=fakeDuration){
            song.pause();
            song.currentTime=0;
            play.src='./svg/play.svg';
            video.pause();

        }
    };

};

app();