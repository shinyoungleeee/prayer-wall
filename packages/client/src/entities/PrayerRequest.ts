export class PrayerRequest {
  private _id?: string;

  constructor(public body: string, public anonymous: boolean) {
    this.body = body;
    this.anonymous = anonymous;
  }

  public static empty() {
    return { ...new PrayerRequest('', true) };
  }

  public async save() {
    if (this.validate()) {
      // const response = await axios('/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   data: urlencode({ 'form-name': 'prayer-request-queue', ...this }),
      // });
      // console.log(response);
    }
  }

  public validate() {
    return this.body.length > 0;
  }
}
