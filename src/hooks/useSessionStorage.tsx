// store the data in a local storage so we can store the progress
export default function useSessionStorage(){
    function saveToSession(val: string, label: string){
        sessionStorage.setItem(label, val);
    }

    function retriveFromSession(label: string){
        let sessionData = sessionStorage.getItem(label);
        return sessionData;

    }

    return {saveToSession, retriveFromSession}
}