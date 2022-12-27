console.log("https://ankitjha2603.github.io/typingEffect/typing.css")
//important constant
const typingEle = Array(...document.getElementsByClassName("typing"));

//important function
const methods = {
  newElement : (cls, content = "", tag = "div") => {
    let element = document.createElement(tag);
    if (cls) {
        if (typeof cls === "object") {
            cls.forEach(clsElement => {
                element.classList.add(clsElement);
            });
        } else {
            element.classList.add(cls);
        }
    }
    if (content) {
        element.innerText = content;
    }
    return element;
  },
  append : (mainElement, ...subElements) => {
    subElements.forEach(subElement => {
        mainElement.append(subElement);
    })
  }
  ,
  getAttribute :(ele,att,exp) => {
    if(ele.getAttribute(att)!=null)return ele.getAttribute(att)
    return exp
  }
}

typingEle.forEach((element) => {
  element.setAttribute("char_index", "0");
  element.setAttribute("text_index", "0");
  const textBox = methods.newElement("ankitjha2603_text_box","","div")
  const hidden = methods.newElement("ankitjha2603_hidden","https://ankitjha2603.github.io/","div")
  methods.append(element,textBox,hidden);
  
  let timeOut = 1000/methods.getAttribute(element, "char_per_sec",4)
  let pauseTime = methods.getAttribute(element, "pauseTime", 0.5)*1000
  const cursorType = methods.getAttribute(element, "cursorType", "normal").toLowerCase()
  if(cursorType=="normal"){
    const cursor = methods.newElement(["ankitjha2603_cursor","ankitjha2603_cursor_nomal"],"","div")
    cursor.style.backgroundColor=methods.getAttribute(element, "cursorColor", "#888888")
    cursor.style.width=methods.getAttribute(element, "cursorWidth", "1.5px")
    methods.append(element,cursor,hidden);
  }else{
    const cursor = methods.newElement(["ankitjha2603_cursor","ankitjha2603_cursor_underscore"],"","div")
    cursor.style.width = methods.getAttribute(element, "cursorWidth", "10px")
    cursor.style.borderBottomColor = methods.getAttribute(element, "cursorColor", "#888888")
    cursor.style.borderBottomWidth = methods.getAttribute(element, "underscore_cursor_height", "5px")
    cursor.style.borderBottomStyle = "solid"
    methods.append(element,cursor,hidden);
  }
  
  let reverse=false
  let stop=0;
  setInterval(
    ele => {
      if(stop==1){
        return false
      }
      const text = ele.getAttribute("text").split(",")
      let char_index = ele.getAttribute("char_index")*1;
      let text_index = ele.getAttribute("text_index")*1;
      ele.firstChild.innerText = text[text_index].slice(0,char_index)
      if(!reverse){
        char_index++;
        if(char_index==text[text_index].length+1){
          reverse = true;
          char_index-=2
          stop=1
          setTimeout(()=>{
            stop=0
          },pauseTime)
        }
        
      }else{
        char_index--;
        if(char_index==-1){
          char_index=0;
          text_index=(text_index+1)%text.length;
          reverse=false
        }
      }
      ele.setAttribute("char_index", char_index)
      ele.setAttribute("text_index", text_index)
    },
    timeOut,
    element
  );
});
