import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  timezones = [{"key": "Europe/Kaliningrad", "value": "Europe/Kaliningrad (UTC+0200)"}, {"key": "Europe/Moscow", "value": "Europe/Moscow (UTC+0300)"}, {"key": "Europe/Simferopol", "value": "Europe/Simferopol (UTC+0300)"}, {"key": "Europe/Volgograd", "value": "Europe/Volgograd (UTC+0300)"}, {"key": "Europe/Kirov", "value": "Europe/Kirov (UTC+0300)"}, {"key": "Europe/Astrakhan", "value": "Europe/Astrakhan (UTC+0400)"}, {"key": "Europe/Saratov", "value": "Europe/Saratov (UTC+0400)"}, {"key": "Europe/Ulyanovsk", "value": "Europe/Ulyanovsk (UTC+0400)"}, {"key": "Europe/Samara", "value": "Europe/Samara (UTC+0400)"}, {"key": "Asia/Yekaterinburg", "value": "Asia/Yekaterinburg (UTC+0500)"}, {"key": "Asia/Omsk", "value": "Asia/Omsk (UTC+0600)"}, {"key": "Asia/Novosibirsk", "value": "Asia/Novosibirsk (UTC+0700)"}, {"key": "Asia/Barnaul", "value": "Asia/Barnaul (UTC+0700)"}, {"key": "Asia/Tomsk", "value": "Asia/Tomsk (UTC+0700)"}, {"key": "Asia/Novokuznetsk", "value": "Asia/Novokuznetsk (UTC+0700)"}, {"key": "Asia/Krasnoyarsk", "value": "Asia/Krasnoyarsk (UTC+0700)"}, {"key": "Asia/Irkutsk", "value": "Asia/Irkutsk (UTC+0800)"}, {"key": "Asia/Chita", "value": "Asia/Chita (UTC+0900)"}, {"key": "Asia/Yakutsk", "value": "Asia/Yakutsk (UTC+0900)"}, {"key": "Asia/Khandyga", "value": "Asia/Khandyga (UTC+0900)"}, {"key": "Asia/Vladivostok", "value": "Asia/Vladivostok (UTC+1000)"}, {"key": "Asia/Ust-Nera", "value": "Asia/Ust-Nera (UTC+1000)"}, {"key": "Asia/Magadan", "value": "Asia/Magadan (UTC+1100)"}, {"key": "Asia/Sakhalin", "value": "Asia/Sakhalin (UTC+1100)"}, {"key": "Asia/Srednekolymsk", "value": "Asia/Srednekolymsk (UTC+1100)"}, {"key": "Asia/Kamchatka", "value": "Asia/Kamchatka (UTC+1200)"}, {"key": "Asia/Anadyr", "value": "Asia/Anadyr (UTC+1200)"}];

  timezone: string;
}
