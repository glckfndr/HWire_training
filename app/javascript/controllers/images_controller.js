import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['image'];
  connect(){
    const title = document.createElement('p');
    title.textContent = this.imageTarget.alt;
    this.element.appendChild(title);
  }

  getUrl(e){
    this.dispatch("copy", {detail: {content: `Image ${e.target.src} has been copied!`}})
    navigator.clipboard.writeText(e.target.src)

  }

  imageTargetConnected(e){
    console.log(e.alt)
  }
}
