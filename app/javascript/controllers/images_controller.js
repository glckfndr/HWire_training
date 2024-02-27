import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['image', 'title', 'save'];
  connect(){
    const title = document.createElement('p');
    title.textContent = this.imageTarget.alt;
    title.contentEditable = true;
    title.dataset.imagesTarget = 'title'
    title.dataset.action = 'click->images#editTitle'
    this.element.appendChild(title);
  }

  editTitle(e){
    if(!this.hasSaveTarget){
    const btn = document.createElement('button')
    btn.textContent = 'Save'
    btn.dataset.imagesTarget = 'save'
    btn.classList = 'btn btn-primary btn-sm'
    e.target.insertAdjacentElement('afterend', btn)
    }
  }

  getUrl(e){
    this.dispatch("copy", {detail: {content: `Image ${e.target.src} has been copied!`}})
    navigator.clipboard.writeText(e.target.src)

  }

  imageTargetConnected(e){
    console.log(e.alt)
  }

  titleTargetConnected(el){
    console.log(el);
  }
}
