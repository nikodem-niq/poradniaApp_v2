import html2pdf from 'html2pdf.js';

export const printData = (from) => {
    const data = document.getElementById('dataGridTable');
    // const actionsTableHeader = document.getElementById('actionsTableHeader');
    // const actionsTableHeaderItems = document.querySelectorAll('.actionRemoveData');
        const opt = {
            margin: 0,
            filename: `dane_${from}.pdf`,
            image: {type: 'png',quality: 0.98},
            html2canvas: {scale: 1},
            jsPDF: {
              unit: 'pt',
              format: [1500, 1500],
              orientation: 'landscape'
            }
        }
        // actionsTableHeader.style.display = 'none';
        // for(let i=0; i<actionsTableHeaderItems.length; i++) {
        //     actionsTableHeaderItems[i].style.display = 'none';
        // }
        setTimeout(() => {
            // actionsTableHeader.style.display = 'block';
            // for(let i=0; i<actionsTableHeaderItems.length; i++) {
            //     actionsTableHeaderItems[i].style.display = 'block';
            // }
            html2pdf().from(data).set(opt).save();
        },3500)
}