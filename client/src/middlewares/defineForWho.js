export const defineForWho = (data,classes) => {
    switch(data) {
        case 0:
            if(classes) {
                // console.log(classes)
                let classList = [];
                let splittedClass = classes.split(',');
                for(let i=0; i<classes.length; i++) {
                    if(splittedClass[i] === true || splittedClass[i] === 'true') {
                        switch(i) {
                            case 0:
                                classList.push('Rok zycia 0-3.');
                                break;
                            case 1:
                                classList.push('Przedszkole (PP)')
                                break;
                            case 2:
                                classList.push('Rok zycia 6')
                                break;
                            case 11:
                                classList.push('I Liceum')
                                break;                                
                            case 12:
                                classList.push('II Liceum')
                                break;                                
                            case 13:
                                classList.push('III Liceum')
                                break;                                
                            case 14:
                                classList.push('IV Liceum')
                                break;     

                            case 15:
                                classList.push('I Technikum')
                                break;                                
                            case 16:
                                classList.push('II Technikum')
                                break;                                
                            case 17:
                                classList.push('III Technikum')
                                break;                                
                            case 18:
                                classList.push('IV Technikum')
                                break;                                
                            case 19:
                                classList.push('V Technikum')
                                break;  
                                
                            case 20:
                                classList.push('I - I Branzowa')
                                break;                                
                            case 21:
                                classList.push('I - II Branzowa')
                                break;                                
                            case 22:
                                classList.push('I - III Branzowa')
                                break;                                
                            case 23:
                                classList.push('II - I Branzowa')
                                break;                                
                            case 24:
                                classList.push('II - II Branzowa')
                                break;   
                                
                                
                            default:
                                classList.push(`${i-2} pods.`);
                                break;
                        }
                    }
                }
                return `uczniowie (klasy: ${classList})`
            }
            break;
        case 1:
            return 'rodzice'
        case 2:
            return 'nauczyciele'
        default:
            break;
        }
    }