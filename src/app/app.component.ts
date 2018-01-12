import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  @ViewChild('f') searchForm: NgForm;

  dataSetObject = [
    { 'categoryId': 100, 'parentCategoryId': -1, 'name': 'Business', 'keywords': 'Money' },
    { 'categoryId': 200, 'parentCategoryId': -1, 'name': 'Tutoring', 'keywords': 'Teaching' },
    { 'categoryId': 101, 'parentCategoryId': 100, 'name': 'Accounting', 'keywords': 'Taxes' },
    { 'categoryId': 102, 'parentCategoryId': 100, 'name': 'Taxation', 'keywords': null },
    { 'categoryId': 201, 'parentCategoryId': 200, 'name': 'Computer', 'keywords': null },
    { 'categoryId': 103, 'parentCategoryId': 101, 'name': 'Corporate Tax', 'keywords': null },
    { 'categoryId': 202, 'parentCategoryId': 201, 'name': 'Operating System', 'keywords': null },
    { 'categoryId': 109, 'parentCategoryId': 101, 'name': 'Small business Tax', 'keywords': null }
  ];

  categoryId: number;
  categoryLevel: number;
  dataSet: any;
  parentDataSet: any;
  isLoadingData = false;
  seachingByCategoryId = false;
  searchingByCategoryLevel = false;

  searchByCategoryId(id) {

    this.categoryLevel = null;
    this.dataSet = [];
    this.isLoadingData = true;
    this.searchingByCategoryLevel = false;
    this.seachingByCategoryId = true;

    setTimeout(() => {

      this.dataSet = this.dataSetObject.filter(p => p.categoryId === id);
      this.parentDataSet = this.dataSet;

      while (this.parentDataSet[0].keywords === null) {
        this.parentDataSet = this.dataSetObject.filter(p => p.categoryId === this.parentDataSet[0].parentCategoryId);
      }

      this.dataSet[0].keywords = this.parentDataSet[0].keywords;

      this.isLoadingData = false;

    }, 2000);

  }

  searchByCategoryLevel(level) {

    this.categoryId = null;
    this.dataSet = [];
    this.isLoadingData = true;
    this.searchingByCategoryLevel = true;
    this.seachingByCategoryId = false;
    let temporalDataSet = [];

    setTimeout(() => {

      for (const object of this.dataSetObject) {
        let levelCounter = 1;

        // if (object.parentCategoryId !== -1) {

          temporalDataSet = this.dataSetObject.filter(p => p.categoryId === object.categoryId);
          this.parentDataSet = temporalDataSet;

          while (this.parentDataSet[0].parentCategoryId !== -1) {
            levelCounter++;
            this.parentDataSet = this.dataSetObject.filter(p => p.categoryId === this.parentDataSet[0].parentCategoryId);
          }

          if (levelCounter === parseInt(level, 10)) {
            this.dataSet.push(object);
            // console.log('dataSet', this.dataSet);
          }

        // }
      }

      this.isLoadingData = false;

    }, 2000);

  }

  resetForm() {
    this.searchForm.reset();
    this.dataSet = null;
    this.parentDataSet = null;
    this.categoryId = null;
    this.isLoadingData = false;
    this.searchingByCategoryLevel = false;
    this.seachingByCategoryId = false;
  }

}
