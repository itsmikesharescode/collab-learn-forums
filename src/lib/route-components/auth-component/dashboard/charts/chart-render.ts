//importing chartjs from node_modules

import { Chart, type ChartConfiguration } from 'chart.js/auto';

type ChartNode = string | HTMLCanvasElement;

//here we are exporting const variable, which is an arrow function,
//and the arrow function takes one argument called node
export const chartRender = (node: ChartNode, options: ChartConfiguration) => {
    console.log('Action')
    console.log(node)
    console.log(options)

    const _chart = new Chart(node, options)
    return {
        update(updatedoptions: any) {
            _chart.data = updatedoptions.data
            _chart.update()
        },
        destroy() {
            console.log("Destroy function is called:")
            _chart.destroy()
        }
    }
}