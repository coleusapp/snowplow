export default (context, inject) => {
  const toFarsiNumber = (n) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

    return n
      .toString()
      .split('')
      .map((x) => farsiDigits[x])
      .join('')
  }

  // Inject $toFarsiNumber(n) in Vue, context and store.
  inject('toFarsiNumber', toFarsiNumber)
}
