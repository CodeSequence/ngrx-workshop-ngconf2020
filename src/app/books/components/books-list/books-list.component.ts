import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BookModel } from "src/app/shared/models";

@Component({
  selector: "app-books-list",
  templateUrl: "./books-list.component.html",
  styleUrls: ["./books-list.component.css"]
})
export class BooksListComponent {
  @Input() books: BookModel[];
  @Input() readonly = false;
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
}
