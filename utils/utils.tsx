// function for generating a random number between 100 and 100,000
export const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100000) + 100
}

export const formatToUSD = (amount: number): string => {
    const parts = amount?.toFixed(2).toString().split('.')
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `${integerPart}.${parts[1]}`
}

export const generateRandomSuccessRate = (): boolean => {
    const randomValue = Math.random()
    return randomValue <= 0.9
}

export const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString)
    const formattedTime = date.toLocaleString('es-ES', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
    })
    const formattedDate = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    return `${formattedTime} - ${formattedDate.replace(/\//g, '/')}`
}
