# E2E Report (MCP Chrome)

## Environment

- App URL used for validation: `http://localhost:3010`
- Note: repository default dev port (`3006`) was occupied by another local service.
- Browser tool: MCP Chrome DevTools integration.

## Critical Flows Executed

1. **Home page EN -> VI toggle**
   - Opened `/` in EN.
   - Clicked language toggle.
   - Verified header labels switched to accented Vietnamese (`Trang chủ`, `Phim bộ`,
     `Phim lẻ`, `Thịnh hành`) and home sections switched to Vietnamese.

2. **Locale persistence on reload**
   - Reloaded home page after switching to VI.
   - Confirmed VI remained active and localized title/genre labels were still rendered.

3. **Popular page localization in VI**
   - Navigated to `/popular`.
   - Verified localized heading and time unit selector values in Vietnamese
     (`Thịnh hành theo`, `Ngày`).

4. **Detail page localization in VI**
   - Navigated to `/browse/movie/67566`.
   - Verified localized labels and actions (`QUAY LẠI DANH SÁCH`, `DIỄN VIÊN`,
     `PHIM TƯƠNG TỰ`, `KHỞI CHIẾU`, etc.).

5. **VI -> EN toggle on detail page**
   - Toggled language back to EN on detail page.
   - Verified header and detail metadata labels switched to EN (`BACK TO LIST`,
     `DIRECTOR`, `WRITER`, `COUNTRY`, `RELEASE DATE`, `Cast`, `Related titles`).

6. **Mobile viewport check**
   - Emulated `390x844` mobile viewport.
   - Verified header controls and detail content remained accessible and readable.

## Console and Network Checks

- **Console errors:** none found.
- **Console warnings:** non-blocking CSS preload warnings only.
- **Failed network requests:** none observed; requests returned successful statuses.

## Result

- E2E validation passed for critical EN/VI toggle flows, persistence, localized
  browse/detail behavior, and mobile readability.
