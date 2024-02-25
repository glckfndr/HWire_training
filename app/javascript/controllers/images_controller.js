import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

  getUrl(e){
    this.dispatch("copy", {detail: {content: `Image ${e.target.src} has been copied!`}})
    navigator.clipboard.writeText(e.target.src)

  }
}
