export const validate = (name,value,errors,setErrors) => {
    switch(name) {
        case 'nameOfInstitution' :
            if(value.length < 3 || value.length > 125 || typeof value == String) {
                setErrors({...errors, [name] : 'Sprawdź czy pole posiada min. 3 znaki i czy jest poprawnym tekstem.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'email' :
            if(value.length < 3 || value.length > 70 || typeof value == String || !value.includes('@') || !value.includes('.')) {
                setErrors({...errors, [name] : 'Sprawdź czy pole posiada min. 3 znaki i czy jest poprawnym emailem.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'city' : 
            if(value.length < 3 || value.length > 150 || typeof value == String) {
                setErrors({...errors, [name] : 'Sprawdź czy pole posiada min. 3 znaki i czy jest poprawną miejscowością.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'postalCode' :
            if(value.length < 5 || value.length > 6 || typeof value == String || !value.includes('-')) {
                setErrors({...errors, [name] : 'Sprawdź czy pole jest poprawnym kodem pocztowym.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'community' :
            if(value.length < 3 || value.length > 70 || typeof value == String) {
                setErrors({...errors, [name] : 'Sprawdź czy pole posiada min. 3 znaki i czy jest poprawną gminą.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'address' :
            if(value.length < 3 || value.length > 100 || typeof value == String) {
                setErrors({...errors, [name] : 'Sprawdź czy pole posiada min. 3 znaki i czy jest poprawnym adresem.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'telephone' :
            if(value.length < 8 || value.length > 9 || typeof value == String) {
                setErrors({...errors, [name] : 'Sprawdź czy pole posiada 9 cyfr i czy jest poprawnym numerem telefonu.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;

        // Employees
        case 'firstName':
            if(value.length < 3 || value.length > 100 || typeof value == String) {
                setErrors({...errors, [name] : 'Sprawdź czy pole posiada min. 3 znaki i czy jest poprawnym imieniem.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'lastName':
            if(value.length < 3 || value.length > 100 || typeof value == String) {
                setErrors({...errors, [name] : 'Sprawdź czy pole posiada min. 3 znaki i czy jest poprawnym nazwiskiem.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'age':
            if(parseInt(value) < 0 || parseInt(value) > 120 || typeof parseInt(value) == Number) {
                setErrors({...errors, [name] : 'Sprawdź czy pole jest poprawnym wiekiem.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;

            // Programs
        case 'nameOfProgram':
            if(value.length < 3 || value.length > 100 || typeof value == String) {
                setErrors({...errors, [name] : 'Sprawdź czy pole posiada min. 3 znaki i czy jest poprawną nazwą.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;

           //Events 
        case 'dateOfEvent':
            if(typeof value == String) {
                setErrors({...errors, [name] : 'Sprawdź czy pole jest poprawną datą.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'howManyParticipiants':
            if(parseInt(value) < 0 || parseInt(value) > 5000 || typeof parseInt(value) == Number) {
                setErrors({...errors, [name] : 'Sprawdź czy pole jest poprawną liczbą (zakres 0-5000).'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'howManyPrograms':
            if(parseInt(value) < 0 || parseInt(value) > 100 || typeof parseInt(value) == Number) {
                setErrors({...errors, [name] : 'Sprawdź czy pole jest poprawną liczbą (zakres 0-100).'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        default:
            break;
    }
}