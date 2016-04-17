/* Use the same lengths as in backend models! */

module.exports = {
    userUsernameMin: 3,
    userUsernameMax: 30,
    userEmailMax: 254,
    userEmailMin: 3,
    userPasswordMax: 1000,
    userPasswordMin: 8,

    eventNameMax: 30,
    eventNameMin: 3,
    eventAddressCountryMax: 255,
    eventAddressZipCodeMax: 255,
    eventAddressStreetAddressMax: 255,
    eventAddressStreetAddressMin: 5,
    eventMaxDaysInTheFuture: 365,
    eventDescriptionMaxLength: 500,

    contactEmailMaxLength: 254,
    contactEmailMinLength: 3,
    contactDescriptionMaxLength: 500,
    contactDescriptionMinLength: 1,

    attendanceCommentMax: 255

}