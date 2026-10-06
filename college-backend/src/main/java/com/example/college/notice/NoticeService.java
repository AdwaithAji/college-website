package com.example.college.notice;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.college.common.ApiResponse;
import com.example.college.exception.ResourceNotFoundException;
import com.example.college.notice.dto.NoticeCreateDto;
import com.example.college.notice.dto.NoticeResponseDto;

@Service 
public class NoticeService {

    private NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public List<NoticeResponseDto> getAllNotice() {
        List<Notice> notices = noticeRepository.findAll();  
        List<NoticeResponseDto> noticeData = new ArrayList<>();

        for(Notice notice : notices) {
            noticeData.add(new NoticeResponseDto(
                notice.getId(), 
                notice.getTitle(), 
                notice.getDescription(), 
                notice.getCategory(), 
                notice.getPublishedAt()
            ));
        }

        return noticeData;
    }

    public ApiResponse<NoticeResponseDto> addNotice(NoticeCreateDto info) {

        Notice newNotice = new Notice(null, info.title(), info.description(), info.category(), LocalDateTime.now());
        Notice notice = noticeRepository.save(newNotice);

        NoticeResponseDto createdNotice = new NoticeResponseDto(notice.getId(), notice.getTitle(), notice.getDescription(), notice.getCategory(), notice.getPublishedAt());

        return new ApiResponse<NoticeResponseDto>("success", "Notice created successfully", createdNotice);
    }

    public ApiResponse<Void> deleteNoticeById(Long id) {
        Notice notice = noticeRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Notice not found"));

        noticeRepository.delete(notice);

        return new ApiResponse<Void>("Success","Deleted notice successfully",null);
    }

}
