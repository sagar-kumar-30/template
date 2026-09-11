const validators: Record<string, (v: string) => string | null> = {
  name: (v) => {
    if (!v.trim()) return 'Full name is required'
    if (v.trim().length < 2) return 'Must be at least 2 characters'
    if (!/^[a-zA-Z\s'\-]+$/.test(v.trim())) return 'Letters, spaces, hyphens and apostrophes only'
    return null
  },

  email: (v) => {
    if (!v.trim()) return 'Email address is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Enter a valid email address'
    return null
  },

  mobileNo: (v) => {
    if (!v.trim()) return 'Mobile number is required'
    const digits = v.replace(/\D/g, '')
    if (digits.length < 7 || digits.length > 15) return 'Must be 7–15 digits'
    return null
  },

  dob: (v) => {
    if (!v) return 'Date of birth is required'
    const date = new Date(v)
    if (isNaN(date.getTime())) return 'Enter a valid date'
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date >= today) return 'Date of birth must be in the past'
    const y = today.getFullYear() - date.getFullYear()
    const m = today.getMonth() - date.getMonth()
    const age = m < 0 || (m === 0 && today.getDate() < date.getDate()) ? y - 1 : y
    if (age < 18) return 'You must be at least 18 years old'
    if (age > 120) return 'Enter a valid date of birth'
    return null
  },

  street: (v) => {
    if (!v.trim()) return 'Street address is required'
    if (v.trim().length < 5) return 'Must be at least 5 characters'
    return null
  },

  city: (v) => {
    if (!v.trim()) return 'City is required'
    if (v.trim().length < 2) return 'Must be at least 2 characters'
    if (!/^[a-zA-Z\s'\-]+$/.test(v.trim())) return 'Letters and spaces only'
    return null
  },

  state: (v) => {
    if (!v.trim()) return 'State is required'
    if (!/^[a-zA-Z\s'\-]+$/.test(v.trim())) return 'Letters and spaces only'
    return null
  },

  zip: (v) => {
    if (!v.trim()) return 'ZIP code is required'
    if (!/^\d{5}(-\d{4})?$/.test(v.trim())) return 'Use format: 12345 or 12345-6789'
    return null
  },
}

export const validate = (name: string, value: string): string | null =>
  validators[name]?.(value) ?? null
