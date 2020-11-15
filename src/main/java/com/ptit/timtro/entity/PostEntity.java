package com.ptit.timtro.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.swing.text.View;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", columnDefinition = "blob")
    private String content;

    @Column(name = "create_time", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date createDate;

    @Column(name = "end_time", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "acreage", nullable = false)
    private Integer acreage;

    @Column(name = "view", nullable = false)
    private Integer view;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "status", nullable = false, length = 255)
    private String status;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "postEntity")
    private List<ImageEntity> images;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "postEntity")
    private List<CommentEntity> comments;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ward_id", nullable = false)
    private WardEntity wardEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity categoryEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_vip_id", nullable = false)
    private PostVipEntity postVipEntity;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "postEntity")
    private List<FavoriteEntity> favorites;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "postEntity")
    private List<ViewHistoryEntity> viewHistories;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "post_tag",
            joinColumns = {@JoinColumn(name = "post_id", nullable = false, referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_post_post_tag"))},
            inverseJoinColumns = {@JoinColumn(name = "tag_id", nullable = false, referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_post_tag_tag"))},
            uniqueConstraints = {@UniqueConstraint(columnNames = {"post_id", "tag_id"})})
    private List<TagEntity> tags;
}
