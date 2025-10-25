import { ref, toValue, watchEffect,} from "vue";

// export function useFetch() {
//     const isLoading = ref(false);
//     const error = ref('')

//     const fetchData = async (url, options = {}) => {
//         isLoading.value = true;
//         error.value = '';

//         try {
//             const response = await fetch(url, {
//                 ...options, 
//                 body: options.body ? JSON.stringify(options.body) : null
//             });
        
//             if (!response.ok) {
//                 throw new Error('error')
//             }

//             return await response.json();
//         }
//         catch (err) {
//             error.value = err.message;
//         } finally {
//             isLoading.value = false;
//         }
//     }



//     return {isLoading, error, fetchData}
// }

export function useFetch(url) {
    const isLoading = ref(false);
    const error = ref('');
    const data = ref();

    const fetchData = async () => {
        try {
            const response = await fetch(toValue(url));
             
            if (!response.ok) {
                throw new Error('error')
            }

            data.value = await response.json();
        }
        catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    }


    watchEffect(() => {
        fetchData()
    })
    return {isLoading, error, data}
}