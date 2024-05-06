import { getDatabase, push, ref, update, set } from 'firebase/database'

export const writeUserData = (userId, name, email, balance) => {
    const db = getDatabase()
    set(ref(db, 'users/' + userId), {
        uid: userId,
        username: name,
        email: email,
        balanceUSD: balance,
    })
}

export const updateUserData = (userId, balance) => {
    const db = getDatabase()
    update(ref(db, 'users/' + userId), {
        balanceUSD: balance,
    })
}

export const writeTransactionData = (
    userId,
    crypto,
    amount,
    operationType,
    date
) => {
    const db = getDatabase()
    const newTransactionRef = ref(db, 'transactions/' + userId)
    push(newTransactionRef, {
        crypto,
        amount,
        operationType,
        date,
    })
}
