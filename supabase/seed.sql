-- =============================================================================
-- Lái Xe Nhàn - Seed Data
-- =============================================================================

insert into public.content_metadata (version, locale, summary, total_cards, offline_size_kb)
values (
    '2026.09.13',
    'vi-VN',
    'Gói nội dung thực tế ban đầu: Đỗ xe hẹp, Đường hẻm, Cao tốc, Thời tiết xấu và Đèn cảnh báo táp-lô.',
    12,
    480
) on conflict (version) do nothing;
