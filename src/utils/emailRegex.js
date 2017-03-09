/*
unfortunately, it's exactly one possible way to validate email and pass
any actually valid emails without any issues.
backend should send user an email with validation link,
and that's how we can make email validation reliable and user-friendly.
for example, in 2017 example@mail is a valid email. also,
"some 'cool:::^#$*?! 1337+-_ `email`"@guava.by  also  a valid email.
"pretty \"cool\""+emails@should.work.too."by the way!
emails@in.emails"@should.work.well.too pretty much like "emails"+"in@subject"@too.
*/
const regex = /.+@.+/;
export default regex;
