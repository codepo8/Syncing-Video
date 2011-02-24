/* if the document is ready... */
$(document).ready(function(){

/* if HTML5 video is supported */
  if($('video').attr('canPlayType')){
    
    $('aside::first').append('<p>Play the video above and see how ' +
                             'the different connected content sections ' +
                             'in the page appear at the right moment. '+
                             'Feel free to jump forward and backward</p>');

    var timestamps = [],
        last = 0,
        all = 0,
        now = 0,
        old = 0,
        i=0;

/* hide all articles via CSS */
    $('html').addClass('js');

/* 
   Loop over the articles, read the timestamp start and end and store 
   them in an array
*/
    $('article').each(function(o){
      if($(this).attr('data-start')){
        timestamps.push({
          start : +$(this).attr('data-start'),
          end : +$(this).attr('data-end'),
          elm : $(this)
        });
      }
    });

    all = timestamps.length;

/* 
  when the video is playing, round up the time to seconds and call the 
  showsection function continuously
*/
    $('video').bind('timeupdate',function(event){
      now = parseInt(this.currentTime);

      /* throttle function calls to full seconds */
      if(now > old){
        showsection(now);
      }
      old = now;

    });

/*
  Test if the current time is within the range of any of the 
  defined timestamps and show the appropriate section.
  Hide all others.
*/
    function showsection(t){
      for(i=0;i<all;i++){
        if(t >= timestamps[i].start && t <= timestamps[i].end){
          timestamps[i].elm.addClass('current');
        } else {
          timestamps[i].elm.removeClass('current');
        }
      }
    };
    
  };
});