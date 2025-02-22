import { CommonModule, DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, type OnInit, computed, input, type Signal, inject, signal } from "@angular/core";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTableModule } from "ng-zorro-antd/table";
import type { AlbumModel, GroupPostsModel, PostModel, PostPhotoModel, UncategorizedPhotos } from "src/app/facebook/models";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import type { FbActivityAcrossFacebookModel } from "src/app/facebook/state/models";
import { IndexedDbService } from "src/app/state/indexed-db.state";
import { FacebookIndexedDBMedia } from "src/app/facebook/models/FacebookIndexDBMedia.interface";
import { AppType } from "src/app/framework/pages/service-selection/app-type";
import { Attachment, ExternalContext, Media, Place, PostDatum } from "src/app/facebook/models/activityAcrossFacebook/Posts/Post";

/**
 * Component for displaying an overview of user posts.
 */
@Component({
  selector: "prioss-posts-overview",
  standalone: true,
  imports: [
    NzBackTopModule,
    ScrollingModule,
    NzTableModule,
    CommonModule,
    NzCardModule,
    DatePipe
  ],
  templateUrl: "./posts-overview.component.html",
  styleUrl: "./posts-overview.component.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsOverviewComponent implements OnInit {
  /** Service for interacting with IndexedDB */
  #indexedDbService = inject(IndexedDbService);

  /** Signal for media files */
  mediaFiles = signal<FacebookIndexedDBMedia[]>([]);

  /** Input for Facebook activity data */
  activityData = input.required<FbActivityAcrossFacebookModel>();

  /** Computed property for all post data */
  postData = computed(() => {
    const allPosts: PostModel[] = [];
    if (this.activityData().posts) {
      allPosts.push(...this.activityData().posts ?? []);
    }
    if (this.activityData().groupPosts) {
      allPosts.push(...this.activityData().groupPosts?.group_posts_v2 ?? []);
    }
    allPosts.sort((a, b) => b.timestamp - a.timestamp);
    return allPosts;
  });

  /** Computed signal for group posts */
  groupPosts: Signal<GroupPostsModel> = computed(() => this.activityData()?.groupPosts ?? {} as GroupPostsModel);

  /** Computed signal for album posts */
  albumPosts: Signal<AlbumModel[]> = computed(() => this.activityData()?.albums ?? []);

  /** Computed signal for photo posts */
  photoPosts: Signal<PostPhotoModel> = computed(() => this.activityData()?.postPhotos ?? {} as PostPhotoModel);

  /** Computed signal for uncategorized photos */
  uncategorizedPhotos: Signal<UncategorizedPhotos> = computed(() => this.activityData()?.uncategorizedPhotos ?? {} as UncategorizedPhotos);

  /**
   * Sorts posts by date
   * @param a First post to compare
   * @param b Second post to compare
   * @returns Comparison result
   */
  sortPostsByDate = (a: SimplifiedPostModel, b: SimplifiedPostModel) => {
    return b.timestamp - a.timestamp;
  }

  /** Computed property for simplified post data */
  simplifiedPostData = computed(() => {
    return this.postData().map(post => {
      const simplifiedPost: SimplifiedPostModel = {
        timestamp: post.timestamp * 1000,
        lastUpdatedTimeStamp: this.getLastUpdateTimestamp(post.data),
        postType: PostType.TEXT,
        attachment: {}
      };

      if (post.attachments) {
        const attachment = post.attachments[0];
        simplifiedPost.attachment = this.processAttachment(attachment);
        simplifiedPost.postType = this.determinePostType(attachment);
      }

      if (post.title) simplifiedPost.title = post.title;
      if (post.tags) simplifiedPost.taggedPeople = post.tags.map(tag => tag.name);
      if (post.data) {
        simplifiedPost.postContent = post.data[0]?.post ?? '';
        simplifiedPost.lastUpdatedTimeStamp = this.getLastUpdateTimestamp(post.data);
      }

      return simplifiedPost;
    });
  });

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  async ngOnInit() {
    this.simplifiedPostData();
    await this.loadMediaFiles();
  }

  /**
   * Loads media files from IndexedDB
   */
  private async loadMediaFiles() {
    try {
      const selectedService = await this.#indexedDbService.getSelectedService(AppType.Facebook);
      const mediaFiles = await this.#indexedDbService.getAllFacebookMediaFiles(selectedService.filename);

      const processedMediaFiles = mediaFiles.map(mediaFile => ({
        ...mediaFile,
        blobURL: URL.createObjectURL(mediaFile.file)
      }));

      this.mediaFiles.set(processedMediaFiles);
    } catch (error) {
      console.error('Error loading media files:', error);
    }
  }

  /**
   * Gets the blob URL for a media file
   * @param path Path of the media file
   * @returns Blob URL of the media file
   */
  getMediaBlobURL(path: string) {
    const blobUrl: string = this.mediaFiles().find(mediaFile => mediaFile.thread_path.includes(path) || path.includes(mediaFile.thread_path))?.blobURL ?? '';
    return blobUrl;
  }

  /**
   * Gets the last update timestamp from post data
   * @param data Array of post data
   * @returns Last update timestamp
   */
  private getLastUpdateTimestamp(data: PostDatum[]): number {
    return (data.findLast((datum) => datum.update_timestamp !== undefined)?.update_timestamp ?? 0) * 1000;
  }

  /**
   * Processes an attachment
   * @param attachment Attachment to process
   * @returns Simplified attachment
   */
  private processAttachment(attachment: Attachment): SimplifiedAttachment {
    if (!attachment?.data?.[0]) return {};

    const attachmentData = attachment.data[0];

    if (attachmentData.media) return this.processMediaAttachment(attachmentData.media);
    if (attachmentData.place) return this.processPlaceAttachment(attachmentData.place);
    if (attachmentData.external_context) return this.processExternalContextAttachment(attachmentData.external_context);

    return {};
  }

  /**
   * Processes a media attachment
   * @param media Media to process
   * @returns Simplified media attachment
   */
  private processMediaAttachment(media: Media): SimplifiedAttachment {
    return {
      media: {
        uri: media.uri ?? '',
        creationTimeStamp: media.creation_timestamp ?? 0,
        title: media.title ?? '',
        exif_upload_ip: media.media_metadata?.photo_metadata.exif_data[0]?.upload_ip ?? '',
        exif_takenTimeStamp: media.media_metadata?.photo_metadata.exif_data[0]?.taken_timestamp ?? 0,
        description: media.description ?? '',
      }
    };
  }

  /**
   * Processes a place attachment
   * @param place Place to process
   * @returns Simplified place attachment
   */
  private processPlaceAttachment(place: Place): SimplifiedAttachment {
    return {
      place: {
        name: place.name,
        coordinate: [place.coordinate?.latitude ?? '', place.coordinate?.longitude ?? ''],
        address: place.address ?? '',
        url: place.url ?? '',
      }
    };
  }

  /**
   * Processes an external context attachment
   * @param externalContext External context to process
   * @returns Simplified external context attachment
   */
  private processExternalContextAttachment(externalContext: ExternalContext): SimplifiedAttachment {
    return {
      externalContext: {
        url: externalContext.url ?? '',
        name: externalContext.name ?? '',
      }
    };
  }

  /**
   * Determines the type of a post based on its attachment
   * @param attachment Attachment to analyze
   * @returns Type of the post
   */
  private determinePostType(attachment: Attachment): PostType {
    if (attachment?.data?.[0]?.media) return PostType.PHOTO;
    if (attachment?.data?.[0]?.place) return PostType.PLACE;
    if (attachment?.data?.[0]?.external_context) return PostType.LINK;
    return PostType.TEXT;
  }
}

/** Interface for simplified post model */
interface SimplifiedPostModel {
  timestamp: number;
  postType: PostType;
  lastUpdatedTimeStamp: number;
  attachment: SimplifiedAttachment;
  postContent?: string;
  title?: string;
  taggedPeople?: string[];
}

/** Enum for post types */
enum PostType {
  PHOTO = "photo",
  PLACE = "place",
  VIDEO = "video",
  TEXT = "text",
  LINK = "link",
  SHARE = "share",
  STATUS = "status",
  ALBUM = "album",
  GROUP = "group",
}

/** Interface for simplified attachment */
interface SimplifiedAttachment {
  media?: SimplifiedMedia;
  place?: SimplifiedPlace;
  externalContext?: SimplifiedExternalContext;
}

/** Interface for simplified external context */
interface SimplifiedExternalContext {
  url: string;
  name?: string;
}

/** Interface for simplified media */
interface SimplifiedMedia {
  uri: string;
  creationTimeStamp: number;
  title: string;
  exif_upload_ip: string;
  exif_takenTimeStamp: number;
  description: string;
}

/** Interface for simplified place */
interface SimplifiedPlace {
  name: string;
  coordinate?: [number, number];
  address?: string;
  url?: string;
}