package com.ptit.timtro.security;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticatedUserInfo {
    private Integer id;
    private String username;
    private String name;
    private String role;
    private String imageUrl;
    private Date createTime;
}