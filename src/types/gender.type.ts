const GENDER = {
    MALE: 'M',
    FEMALE: 'F',
    NEUTRAL: 'N',
    OTHER: 'O'
} as const;

type ObjectValue<T> = T[keyof T]
type Gender = ObjectValue<typeof GENDER>

export default Gender