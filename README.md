# react-mobile-cascade

> 移动端react的级联组件.

## 使用
```js
<Cascade column={3} data={...} onDone={this.change}></Cascade>
```
## 预览
[点击查看demo](https://caoren.github.io/react-mobile-cascade/demo/)

## 参数

#### column
Type: `number`

层级

Note: 必填.

#### data
Type: `array`

级联数据

Note: 必填.

#### title
Type: `string`

标题

Note: 默认为空.

#### onDone
Type: `function`

点击保存按钮触发，返回选中的数据

Note: 返回值为数组，数组长度和column保持一致.

#### onCancel
Type: `function`

点击取消按钮触发

#### immediateDone
Type: `bool`

初始化后是否立刻返回选中的数据

Note: 默认false.

#### scrollTextKey
Type: `string`

展示数据的Key，默认为"text".

#### scrollChildKey
Type: `string`

展示数据子级的Key，默认为"children".

#### scrollCheckedKey
Type: `string`

数据中选中的Key，默认为"checked".


## License
Copyright (c) 2016 [Cao Ren](https://github.com/caoren) under the MIT License.