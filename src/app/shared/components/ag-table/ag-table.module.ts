import { BasicInputCellRendererComponent } from './custom-cell/basic-input/basic-input-cell-renderer.component';
import { BasicInputCellEditorComponent } from './custom-cell/basic-input/basic-input-cell-editor.component';
import { DropdownCellEditorComponent } from './custom-cell/dropdown-cell-editor/dropdown-cell-editor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgTableComponent } from './ag-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { IconButton } from './custom-cell/action-buttons/icon-button.component';
import { SuccessErrorIconButton } from './custom-cell/action-buttons/succes-error-icon.component';
import { CellColor } from './custom-cell/action-buttons/cell-color.component';
import { DropdownCellRendererComponent } from './custom-cell/dropdown-cell-editor/dropdown-cell-renderer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgSelectModule,
    AgGridModule.withComponents([
      IconButton, 
      DropdownCellRendererComponent,
      DropdownCellEditorComponent,
      BasicInputCellEditorComponent,
      BasicInputCellRendererComponent
    ])
  ],
  exports: [AgTableComponent],
  declarations: [
    AgTableComponent,
    IconButton,
    SuccessErrorIconButton,
    CellColor,
    DropdownCellRendererComponent,
    DropdownCellEditorComponent,
    BasicInputCellEditorComponent,
    BasicInputCellRendererComponent,
  ]
})
export class AgTableModule { }
