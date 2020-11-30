package com.ptit.timtro.security.oauth2;

import com.ptit.timtro.dao.UserDAO;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.exception.OAuth2AuthenticationProcessingException;
import com.ptit.timtro.security.AuthProvider;
import com.ptit.timtro.security.Role;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.util.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.UUID;

@Service
@Transactional
public class Oauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (Exception e) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            // throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
            System.out.println(e.toString());
            throw e;
        }

    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
//        UserEntity userEntity = userDAO.getByEmail(oAuth2UserInfo.getEmail());
        String typeAuthProvider = oAuth2UserRequest.getClientRegistration().getRegistrationId();
        UserEntity userEntity = userDAO.checkExistedUser(oAuth2UserInfo.getEmail(), typeAuthProvider);
        if (userEntity != null) {
//            if (!userEntity.getAuthProvider().equals(oAuth2UserRequest.getClientRegistration().getRegistrationId())) {
//                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
//                        userEntity.getAuthProvider() + " account. Please use your " + userEntity.getAuthProvider() +
//                        " account to login.");
//            }else{
            userEntity = updateExistingUser(userEntity, oAuth2UserInfo);
//            }
        } else {
            userEntity = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }
        return UserPrincipal.createInstance(userEntity).addAttributes(oAuth2User.getAttributes());
    }

    private UserEntity registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        UserEntity userEntity = new UserEntity();
        userEntity.setAuthProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        userEntity.setProviderId(oAuth2UserInfo.getId());
        userEntity.setUsername(UUID.randomUUID().toString()); // TODO chỗ này sửa đi thành tự động gen ra username và password
        userEntity.setPassword(passwordEncoder.encode(PasswordGenerator.generate(true, true, true, true, 8)));
        userEntity.setName(oAuth2UserInfo.getName());
        userEntity.setEmail(oAuth2UserInfo.getEmail());
        userEntity.setImageUrl(oAuth2UserInfo.getImageUrl());
        userEntity.setRole(Role.MEMBER);
        
        Date date = new Date();
        userEntity.setCreateTime(date);
        return userDAO.create(userEntity);
    }

    private UserEntity updateExistingUser(UserEntity existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        return userDAO.update(existingUser);
    }
}