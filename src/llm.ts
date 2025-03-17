import { TreeItem, TreeDataProvider, ProviderResult } from 'vscode'

export interface Model {
  name:'gpt-4'|'llama'|'deepseek'
  baseUri:string
  description:string
}

class ModelTreeItem extends TreeItem {
  constructor(model:Model) {
    super('Model')
    this.label = model.name
    this.description = model.description
    this.tooltip = model.name
    this.command = {
      title: 'Model',
      command: 'vscode-ai-assistant.showModel',
      arguments: [model.name]
    }
  }
}

export class ModelDataProvider implements TreeDataProvider<ModelTreeItem> {
  getTreeItem(element: ModelTreeItem): TreeItem {
    return element
  }
  getChildren(): ModelTreeItem[] {
    return [
      new ModelTreeItem({
        name:'gpt-4', 
        baseUri:'',
        description:'The fourth version of the GPT model'
      }),
      new ModelTreeItem({
        name:'llama', 
        baseUri:'',
        description:'The Llama model'
      }),
      new ModelTreeItem({
        name:'deepseek', 
        baseUri:'https://api.deepseek.com/chat/completions',
        description:'The Deepseek model'
      })
    ]
  }
  getParent(element: ModelTreeItem): ProviderResult<ModelTreeItem> {
    return null
  }
}
